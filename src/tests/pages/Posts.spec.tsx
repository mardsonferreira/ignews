import { render, screen } from "@testing-library/react";
import { mocked } from "jest-mock";

import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";

jest.mock("next-auth/client", () => {
  return {
    useSession() {
      return [
        {
          user: { name: "John Doe", email: "john.doe@example.com" },
          activeSubscription: "fake-subscription",
          expires: "fake-expires",
        },
        false,
      ];
    },
  };
});

jest.mock("../../services/prismic");

const posts = [
  {
    slug: "my-new-post",
    title: "My new post",
    excerpt: "Post excerpt",
    updatedAt: "12 de Fevereiro de 2022",
  },
];

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My new post")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My new post" }],
              content: [{type: "paragraph", text: "Post's content"}],
            },
            last_publication_date: "02-12-2022",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: "my-new-post",
            title: "My new post",
            excerpt: "Post's content" ,
            updatedAt: "12 de fevereiro de 2022"
          }],
        }
      })
    );
  });
});
