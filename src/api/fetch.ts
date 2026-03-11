export const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

export const url = {
  tarot: {
    read: "/tarot/read",
  },
};

const customFetch = async <T = unknown>(
  input: string | URL | globalThis.Request,
  init?: RequestInit,
  type: "json" | undefined = "json",
) => {
  const url = `${baseUrl}${input}`;
  const response = await fetch(url, {
    ...init,
    credentials: "include",
  });

  let body: T | undefined;

  if (response.ok && type) {
    switch (type) {
      case "json":
        body = await response.json();
        break;
      default:
        break;
    }
  }

  return {
    ok: response.ok, // pass the ok status along
    status: response.status, // pass the status along
    headers: response.headers, // pass the headers along
    body, // pass the body along
  };
};

export const api = {
  tarot: {
    execute: async (): Promise<{
      ok: boolean;
      status: number;
      headers: Headers;
      body:
        | {
            message: string;
            data: {
              title: string;
              titleKR: string;
              keywords: string[];
              advice: string;
            };
          }
        | undefined;
    }> => {
      if (process.env.NODE_ENV === "development") {
        // wait for 1 second to simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
          ok: true,
          status: 200,
          headers: new Headers(),
          body: {
            message: "message",
            data: {
              title: "title",
              titleKR: "제목",
              keywords: ["keyword1", "keyword2", "keyword3", "keyword4"],
              advice:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." +
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            },
          },
        };
      }
      return customFetch<{
        message: string;
        data: {
          title: string;
          titleKR: string;
          keywords: string[];
          advice: string;
        };
      }>(url.tarot.read);
    },
  },
};
