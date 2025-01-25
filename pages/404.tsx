import getMainLayout from "~~/components/Layout/getMainLayout";
import RightSidePanel from "~~/components/Layout/RightSidePanel/dynamic";
import NotFound from "~~/components/NotFound";

export default function NotFoundPage() {
  return (
    <>
      <NotFound />
      <RightSidePanel />
    </>
  );
}

NotFoundPage.getLayout = getMainLayout;
