import { useRouter } from "next/router";

export default function Room() {
  const roomNumber = useRouter().query.id;
  return (
    <div>
      <p>Room Number {roomNumber}</p>
    </div>
  );
}
