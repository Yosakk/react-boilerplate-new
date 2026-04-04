import React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"


export interface AccordionItemData {
  value: string
  trigger: React.ReactNode
  content: React.ReactNode
}

interface AccordionComponentProps {
  items: AccordionItemData[]
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string
  className?: string
  borderColor?: string
}

const AccordionComponent: React.FC<AccordionComponentProps> = ({
  items,
  type = "single",
  collapsible = true,
  defaultValue,
  className,
  borderColor
}) => {
  const accordionProps =
    type === "single"
      ? { type: "single" as const, collapsible, defaultValue }
      : { type: "multiple" as const, defaultValue: defaultValue ? [defaultValue] : undefined }

  return (
    <Accordion {...accordionProps} className={className}>
      {items.map(({ value, trigger, content }) => (
        <AccordionItem key={value} value={value} borderColor={borderColor}>
          <AccordionTrigger>{trigger}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default AccordionComponent