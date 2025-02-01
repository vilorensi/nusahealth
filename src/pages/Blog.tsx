import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Mental Health in the Digital Age",
      excerpt: "Explore how technology affects our mental well-being and learn strategies to maintain balance.",
      author: "Dr. Sarah Johnson",
      date: "2024-02-20",
      readTime: "5 min read",
      category: "Mental Health",
    },
    {
      id: 2,
      title: "Essential Nutrients for a Healthy Diet",
      excerpt: "A comprehensive guide to the vitamins and minerals your body needs for optimal health.",
      author: "Dr. Michael Chen",
      date: "2024-02-18",
      readTime: "7 min read",
      category: "Nutrition",
    },
    // Add more blog posts as needed
  ];

  return (
    <div className="min-h-screen bg-muted">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Health & Wellness Blog</h1>
          
          <div className="grid gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <Button variant="outline">Read More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;