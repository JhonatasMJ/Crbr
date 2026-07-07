import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger, useGSAP)

if (typeof document !== "undefined") {
  ScrollTrigger.defaults({
    pinType: "transform",
    anticipatePin: 1,
    scroller: document.documentElement,
  })
}

export { gsap, ScrollTrigger, useGSAP }
