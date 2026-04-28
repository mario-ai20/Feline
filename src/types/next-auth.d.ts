import "next-auth";
import "next-auth/jwt";

type AppRole = "user" | "builder";

declare module "next-auth" {
  interface User {
    id: string;
    username?: string | null;
    role?: AppRole;
  }

  interface Session {
    user: {
      id: string;
      username?: string | null;
      role?: AppRole;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string | null;
    role?: AppRole;
  }
}
