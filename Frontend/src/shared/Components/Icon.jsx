import * as RemixIcon from "@remixicon/react"

export default function Icon({name,...props}) {
    const Icon = RemixIcon[name];

    if(!Icon) return (console.log("Icon not Found"));

  return (
   <Icon {...props}/>
  )
}
