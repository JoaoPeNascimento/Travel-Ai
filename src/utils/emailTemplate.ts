export function generateInviteEmail(travelName: string, link: string) {
  return `
    <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <h2 style="color: #343a40;">Olá!</h2>
        <p style="font-size: 16px; color: #495057;">
          Você foi convidado para participar da viagem:
          <strong style="color: #007bff;">${travelName}</strong>.
        </p>
        <p style="font-size: 16px; color: #495057;">
          Clique no botão abaixo para visualizar os detalhes e aceitar o convite:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" target="_blank"
            style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">
            Visualizar Convite
          </a>
        </div>
        <p style="font-size: 14px; color: #868e96;">
          Se você não esperava este convite, pode ignorar este e-mail.
        </p>
        <hr style="border: none; border-top: 1px solid #dee2e6; margin: 40px 0;">
        <p style="font-size: 12px; color: #adb5bd; text-align: center;">
          &copy; ${new Date().getFullYear()} Viagens App. Todos os direitos reservados.
        </p>
      </div>
    </div>
  `;
}
