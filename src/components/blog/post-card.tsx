import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BlogPost } from "@/lib/contenful";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-48 w-full">
          <Image
            src={`https:${post.coverImage.url}`}
            alt={post.coverImage.title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={`https:${post.author.picture.url}`}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {post.author.name} · {format(new Date(post.date), "MMM d, yyyy")}
            </div>
          </div>
          <h3 className="text-xl font-bold leading-tight">{post.title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
