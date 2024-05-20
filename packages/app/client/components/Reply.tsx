export default function Reply({ children }: React.PropsWithChildren) {
  return (
    <ul
      className="list-inside ml-3"
      style={{ listStyleImage: `url("/newline.svg")` }}
    >
      <li>{children}</li>
    </ul>
  );
}
