module.exports = ({ authService }) => {
  return {
    register: async (req, res) => {
      try {
        const result = await authService.register(req.body);

        res.status(201).json({
          message: 'Користувач успішно зареєстрований',
          token: result.token,
          user: result.user
        });
      } catch (error) {
        if (error.message === 'Користувач з таким email вже існує') {
          return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    },

    login: async (req, res) => {
      try {
        const result = await authService.login(req.body);

        res.json({
          message: 'Успішний вхід',
          token: result.token,
          user: result.user
        });
      } catch (error) {
        if (error.message === 'Невірний email або пароль') {
          return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: 'Помилка сервера', error: error.message });
      }
    }
  };
};
