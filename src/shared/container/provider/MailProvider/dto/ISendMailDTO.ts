import IParseMailTemplateDTO from '../../MailTemplateProvider/dto/IParseMailTemplateDTO';

interface IMailContact {
  name: string;
  email: string;
}
export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
