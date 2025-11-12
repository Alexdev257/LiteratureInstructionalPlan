


import FilterTemplates from "./FilterTemplates"
import { mockAPiTemplate, mockGradeLevels } from "@/utils/mockAPi"
import HeroSection from "./HeroSection"

export default function TemplatesPage() {
  const fetchTemplates = mockAPiTemplate
  const fetchGradeLevels = mockGradeLevels

  return (
    <>
      {/* Header Section */}
      <HeroSection />

      {/* Filters Section */}
      <FilterTemplates
        templates={fetchTemplates}
        mockGradeLevels={fetchGradeLevels}
      />
    </>
  )
}
