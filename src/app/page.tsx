import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>PDF Reader</CardTitle>
          <CardDescription>Upload and read PDF documents</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Access our advanced PDF reader with features like highlighting and note-taking.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/pdf-reader">Go to PDF Reader</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardDescription>Manage your study notes</CardDescription>
        </CardHeader>
        <CardContent>
          <p>View, edit, and organize notes you've taken while studying PDFs.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/notes">View Notes</Link>
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exam</CardTitle>
          <CardDescription>Test your knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Generate quizzes based on the content of your studied PDFs.</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/exam">Take an Exam</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
