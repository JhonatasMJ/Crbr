import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { MinusIcon, PlusIcon } from "@phosphor-icons/react"

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("rounded-lg bg-black text-white", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-bold break-words transition-colors duration-300 outline-none hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-yellow-base/50 disabled:pointer-events-none disabled:opacity-50 sm:gap-4 sm:px-5 sm:py-4 sm:text-base",
          className
        )}
        {...props}
      >
        {children}
        <PlusIcon
          data-slot="accordion-trigger-icon"
          weight="bold"
          className="pointer-events-none size-5 shrink-0 text-yellow-base transition-transform duration-300 group-hover/accordion-trigger:scale-110 group-aria-expanded/accordion-trigger:hidden"
        />
        <MinusIcon
          data-slot="accordion-trigger-icon"
          weight="bold"
          className="pointer-events-none hidden size-5 shrink-0 text-yellow-base transition-transform duration-300 group-hover/accordion-trigger:scale-110 group-aria-expanded/accordion-trigger:block"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-xs data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "h-(--radix-accordion-content-height) border-t border-white/10 px-4 pt-3 pb-4 text-sm font-normal text-white/90 sm:px-5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-white [&_p:not(:last-child)]:mb-4",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
