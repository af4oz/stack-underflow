import Error404 from '../svg/404-error.svg'

import 'twin.macro'
import { SvgIcon } from './my-mui/Misc'

const NotFound = () => {
  return (
    <div tw="w-full mt-4 ">
      <div tw="text-center margin-top[15%]">
        <SvgIcon tw="font-size[6em] mb-3 text-blue-600" aria-hidden="true">
          <Error404 />
        </SvgIcon>
        <h2 tw="font-normal mb-0">Page Not Found</h2>
        <p tw="text-sm">The page you requested does not exist.</p>
      </div>
    </div>
  )
}

export default NotFound
