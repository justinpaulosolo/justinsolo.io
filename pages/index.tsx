import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Image from "next/future/image";

import profile from "@/public/profile.jpeg";
import { Container } from "@/components/Container";
import { RecentPostsCard } from "@/components/home/RecentPostsCard";
import { SocialMediaLinks } from "@/lib/constants";
import { Post } from "@/lib/types";
import { Suspense } from "react";

const Home = ({ posts }: { posts: Post[] }) => {
  return (
    <Suspense>

    <Container>
      <div className="flex flex-col">
        <div className="mb-4 flex flex-col items-center space-x-4 md:flex-row">
          <div className="flex items-center">
            <Image
              src={profile}
              alt="profile-pic"
              width={124}
              height={124}
              className="mb-2 rounded-full md:mb-0"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter md:text-6xl">
              Welcome!
            </h1>
            <p className="text-base text-gray-700 dark:text-gray-300">
              I&apos;m{" "}
              <span className="text-2xl font-bold tracking-tighter text-blue-500 md:text-3xl">
                Justin Solo
              </span>{" "}
              a software engineer from Los Angeles, CA.
            </p>
            <div className="flex space-x-3">
              {SocialMediaLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 border-b text-base text-gray-500 dark:text-gray-300 dark:hover:text-white transition-all hover:scale-[1.05] hover:text-blue-500"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 mb-4">
          <h1 className="text-3xl font-bold">Recent Posts</h1>
          <RecentPostsCard
            title={posts[0].frontmatter.title}
            slug={posts[0].slug}
            index="01"
          />
          <RecentPostsCard
            title={posts[1].frontmatter.title}
            slug={posts[1].slug}
            index="02"
          />
          <RecentPostsCard
            title={posts[2].frontmatter.title}
            slug={posts[2].slug}
            index="03"
          />
        </div>
      </div>
    </Container>
    </Suspense>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      frontmatter,
      slug: filename.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default Home;
