import Katalog from "../../Katalog";
import TitleLogo from "../../../components/TitleLogo";
import CreateHousehold from "../../../components/CreateHousehold";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";

export default function Məişət_Texnikası() {
        return (
            
        <div className="mx-auto  my-auto max-w-[1200px]">
            <TitleLogo />
            <Katalog />
            <CreateHousehold disabled={hasFormSubmit} />
        </div>
        )
    };
    

    