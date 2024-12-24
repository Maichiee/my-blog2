import { getPostBySlug } from "@/lib/contenful";
import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={`https:${post.author.picture.url}`}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-medium">{post.author.name}</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </div>
            </div>
          </div>
          <div className="relative aspect-video w-full mb-8">
            <Image
              src={`https:${post.coverImage.url}`}
              alt={post.coverImage.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </header>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}