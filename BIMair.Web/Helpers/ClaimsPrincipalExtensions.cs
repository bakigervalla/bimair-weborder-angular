using System;
using System.Security.Claims;

namespace BIMair.Helpers
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserId(this ClaimsPrincipal principal)
        {
            if (principal == null)
                throw new ArgumentNullException(nameof(principal));

            // return principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return principal.FindFirst("sub")?.Value;
        }

        public static string GetUserRole(this ClaimsPrincipal principal)
        {
            if (principal == null)
                throw new ArgumentNullException(nameof(principal));

            return principal.FindFirst("role")?.Value;
        }

        public static bool IsUserInRole(this ClaimsPrincipal principal, string roleName)
        {
            if (principal == null)
                throw new ArgumentNullException(nameof(principal));

            var role = principal.FindFirst("role")?.Value?.Equals(roleName);
            return role.HasValue && role.Value;
        }
    }
}