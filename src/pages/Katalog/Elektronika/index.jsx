import Katalog from "../../Katalog";
import TitleLogo from "../../../components/TitleLogo";
// import CreateElectronikaPost from "../../../components/CreateElektronikaPost";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import CreateElectronikaPost from "../../../components/CreateElektronikaPost";

function Elektronika() {
    return (
        <div className="mx-auto my-auto max-w-[1200px]">
            <TitleLogo />
            <Katalog />
        <CreateElectronikaPost disabled={hasFormSubmit} />
        </div>
    )
};

export default Elektronika;