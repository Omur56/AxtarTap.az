import Katalog from "../../Katalog";
import TitleLogo from "../../../components/TitleLogo";
import CreateClothing from "../../../components/CreateClothing";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";


function Geyimlər() {
    return (
        <div className="mx-auto  my-auto max-w-[1200px]"> 
            <TitleLogo />
            <Katalog />
            <CreateClothing disabled={hasFormSubmit} />
        </div>
    );
};

export default Geyimlər;