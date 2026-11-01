import profilePic from "../../assets/images/profilePic.webp"

export default function ProfilePic({className}) {
  return (
      <div className={`${className} profile-pic object-contain rounded-full bg-gray-300 p-2 `}>
          <img src={profilePic} />
          </div>
  )
}
