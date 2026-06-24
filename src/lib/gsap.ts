import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
  pinType: "transform",
})

export { gsap, ScrollTrigger }
