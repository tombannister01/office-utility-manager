export default async function Test() {
  const res = await fetch("http://localhost:3000/api/auth/login", { cache: "no-store" });
  const data = await res.json();
  return (
    <div>{data.id} {data.name}</div>
  );
}
