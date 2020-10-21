interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'emailconfiguradonoaws@domain.com.bf',
      name: 'nome configurado no aws',
    },
  },
} as IMailConfig;
