import type { NextPage } from "next";
import Container from "../components/Container";
import Image from "next/future/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import profile from "../public/profile.jpeg";
import Link from "next/link";

interface Posts {
  frontmatter: {
    title: string;
    date: string;
    description: string;
    thumnbailUrl: string;
    tags: string[];
  };
  slug: string;
}

export const RecentPostsCard = ({
  title,
  slug,
  index,
}: {
  title: string;
  slug: string;
  index: string;
}) => {
  return (
    <Link href={"/blog/" + slug} passHref>
      <div className="border-b hover:cursor-pointer border-gray-200 tansform hover:scale-[1.01] py-3 tansition-all ">
        <div className="flex">
          <div className="mr-4 text-gray-600">{index}</div>
          <h4 className="font-medium">{title}</h4>
        </div>
      </div>
    </Link>
  );
};

const Home = ({ posts }: { posts: Posts[] }) => {
  console.log(posts[0].frontmatter.title);
  return (
    <Container>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-6xl tracking-tighter font-bold">Justin Solo</h1>
          <p className="text-gray-800 text-lg">Full Stack Developer</p>
          <div className="flex space-x-3">
            <a
              href="https://www.linkedin.com/in/justinpaulosolo/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://www.github.com/justinpaulosolo/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Github
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Twitter
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <Image
            src={profile}
            alt="profile-pic"
            width={100}
            height={100}
            className="rounded-2xl"
          />
        </div>
      </div>
      <div className="mt-12 mb-4">
        <h1 className="font-bold text-3xl">Recent Posts</h1>
        <RecentPostsCard
          title={posts[0].frontmatter.title}
          slug={posts[0].slug}
          index="01"
        />
      </div>
      <div className="flex justify-center"></div>
    </Container>
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
