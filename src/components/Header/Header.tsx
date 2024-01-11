import "./Header.scss";
import { useAppContext } from "@/context/AppContext";
import { TitleTextA, TitleTextD } from "@/shared/Typography";
import { HiMenu } from "react-icons/hi";

type Props = {
  name: string;
}

export function Header({ name }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { setSideBarData }: any = useAppContext();

  return (
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center w-full justify-between gap-8 max-[900px]:gap-5">
        <div className="header-left flex flex-col justify-center">
          <TitleTextA>{name}</TitleTextA>
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={() => setSideBarData((state: boolean) => !state)}
            className="sidebar-button flex items-center justify-center rounded-md">
            <TitleTextD><HiMenu style={{ fontSize: 30 }} /></TitleTextD>
          </button>
        </div>
      </div>
    </div>
  )
}
