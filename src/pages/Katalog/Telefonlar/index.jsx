import Katalog from "../../Katalog";
import TitleLogo from "../../../components/TitleLogo";
import CreatePhone from "../../../components/CreatePhone";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";





function Telefonlar() {
    return (
        <div className="mx-auto  my-auto max-w-[1200px]">
            <TitleLogo />
            <Katalog />
            <CreatePhone disabled={hasFormSubmit} />
        </div>
    )
    
}

export default Telefonlar;