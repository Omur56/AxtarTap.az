import TitleLogo from "../../../components/TitleLogo";
import Katalog from "../../Katalog";
import CreateRealEstate from "../../../components/CreateRealEstate";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";


function Daşınmaz_əmlak() {
    return (
        <div className="mx-auto  my-auto max-w-[1200px]">
            <TitleLogo />
            <Katalog />
            <CreateRealEstate disabled={hasFormSubmit} />
            
        </div>
    )
};

export default Daşınmaz_əmlak;