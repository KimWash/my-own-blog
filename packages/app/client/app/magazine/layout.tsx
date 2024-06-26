import Header from "@/components/magazine/Header";

export const metadata = {
  title: "draft",
  description: "매거진이 되고 싶은 그저 그런 초안들",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1 bg-orange-50" >
      {children}
    </div>
  );
}
