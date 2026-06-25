import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

ScrollTrigger.defaults({
  pinType: "transform",
  anticipatePin: 1,
})

export { gsap, ScrollTrigger }
