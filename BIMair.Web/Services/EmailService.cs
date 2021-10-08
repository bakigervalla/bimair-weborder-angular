// =============================
// Email: bakigervalla@gmail.com
// www.bimair.nl
// =============================

using BIMair.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;

namespace BIMair.Services
{
    public interface IEmailService
    {
        Task<(bool success, string errorMsg)> SendEmailAsync(string emailTo, string templateName, Dictionary<string, string> replacers = null);
    }

    public class EmailService : IEmailService
    {
        public IConfiguration Configuration { get; }

        public EmailService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public async Task<(bool success, string errorMsg)> SendEmailAsync(string emailTo, string templateName, Dictionary<string, string> replacers = null)
        {
            try
            {
                var template = GetEmailTemplate(templateName, emailTo);

                MailAddress oFromAddress = new(Configuration["SmtpConfig:EmailAddress"], "Email From " + template.From);
                MailAddress oToAddress = new(template.To, "Email To " + template.To);
                string fromPassword = Configuration["SmtpConfig:Password"];
                string subject = template.Subject;
                string body = ReplacePlaceholdersEmailTemplate(template.Body, replacers);

                var smtp = new SmtpClient
                {
                    Host = Configuration["SmtpConfig:Host"],
                    Port = int.TryParse(Configuration["SmtpConfig:Port"], out int port) ? 25 : port,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(oFromAddress.Address, fromPassword)
                };
                using (var message = new MailMessage(oFromAddress, oToAddress)
                {
                    Subject = subject,
                    Body = body
                })
                {
                    await smtp.SendMailAsync(message);
                    return (true, "Email sent successfully");
                }
            }
            catch (Exception ex)
            {
                return (false, ex.Message);

            }
        }

        private string ReplacePlaceholdersEmailTemplate(string template, Dictionary<string, string> replacers = null)
        {
            string emailMessage = template;

            foreach (var dict in replacers)
                emailMessage = emailMessage.Replace($"[{dict.Key}]", dict.Value);

            return emailMessage;
        }

        public string ReadAppSettings(string key)
        {
            string value = Configuration[key];
            if (!String.IsNullOrEmpty(value))
            {
                return value;
            }
            else
                throw new Exception("User or Password not found");
        }

        private EmailTemplate GetEmailTemplate(string templateName, string emailTo)
        {
            return new EmailTemplate
            {
                From = Configuration[$"{templateName}:From"],
                To = !string.IsNullOrEmpty(emailTo) ? emailTo : Configuration[$"{templateName}:To"],
                Subject = Configuration[$"{templateName}:Subject"],
                Body = EmailTemplates.GetEmailTemplate(Configuration[$"{templateName}:TemplateName"])
            };
        }

        public class EmailTemplate
        {
            internal new string From { get; set; }
            internal new string To { get; set; }
            internal new string Subject { get; set; }
            internal new string Body { get; set; }
        }
    }
}