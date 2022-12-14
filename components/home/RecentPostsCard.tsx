import Link from "next/link";

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
      <div className="tansform tansition-all border-b border-gray-200 py-3 hover:scale-[1.01] hover:cursor-pointer dark:border-gray-600 ">
        <div className="flex">
          <div className="mr-4 text-neutral-600 dark:text-neutral-400">
            {index}
          </div>
          <h4 className="font-medium">{title}</h4>
        </div>
      </div>
    </Link>
  );
};
