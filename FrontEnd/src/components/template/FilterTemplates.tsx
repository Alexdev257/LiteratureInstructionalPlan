"use client";
import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GradeLevel, Template, TemplateFilters } from "@/utils/type";
import RenderTemplates from "./RenderTemplates";

interface FilterTemplatesProps {
  templates: Template[];
  mockGradeLevels: GradeLevel[];
}

const FilterTemplates = ({ templates, mockGradeLevels }: FilterTemplatesProps) => {
  const [filters, setFilters] = useState<TemplateFilters>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Price ranges for filtering - Move outside or wrap in useMemo
  const priceRanges = useMemo(
    () => [
      { id: "all", label: "Tất cả giá", min: 0, max: Infinity },
      { id: "free", label: "Miễn phí", min: 0, max: 0 },
      { id: "under-20k", label: "Dưới 20.000đ", min: 1, max: 20000 },
      { id: "20k-30k", label: "20-30k", min: 20000, max: 30000 },
      { id: "above-30k", label: "Trên 30.000đ", min: 30000, max: Infinity },
    ],
    []
  );

  // Filtered templates
  const filteredTemplates = useMemo(() => {
    let result = templates;

    if (filters.gradeLevel) {
      result = result.filter(
        (template) => template.grade.gradeLevelId === filters.gradeLevel
      );
    }

    if (filters.priceRange) {
      const range = priceRanges.find((r) => r.id === filters.priceRange);
      if (range) {
        result = result.filter(
          (template) => template.price >= range.min && template.price <= range.max
        );
      }
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (template) =>
          template.title.toLowerCase().includes(searchLower) ||
          template.createdBy.username.toLowerCase().includes(searchLower)
      );
    }

    return result;
  }, [templates, filters, searchTerm, priceRanges]);

  const handleFilterChange = (
    key: keyof TemplateFilters,
    value: TemplateFilters[keyof TemplateFilters] | "all"
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
  };

  return (
    <>
      <section className="py-8 px-4 border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl p-5 rounded-lg shadow-sm">
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Bộ lọc</h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
              >
                Xóa bộ lọc
              </Button>
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm giáo án, bài giảng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-primary/20 focus:border-primary"
                />
              </div>

              {/* Grade Level */}
              <Select
                value={filters.gradeLevel?.toString() || "all"}
                onValueChange={(value: string) =>
                  handleFilterChange(
                    "gradeLevel",
                    value === "all" ? undefined : parseInt(value)
                  )
                }
              >
                <SelectTrigger className="border-primary/20 focus:border-primary w-[160px]">
                  <SelectValue placeholder="Chọn lớp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả lớp</SelectItem>
                  {mockGradeLevels.map((grade) => (
                    <SelectItem
                      key={grade.gradeLevelId}
                      value={grade.gradeLevelId.toString()}
                    >
                      {grade.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Range */}
              <Select
                value={filters.priceRange || "all"}
                onValueChange={(value: string) =>
                  handleFilterChange("priceRange", value)
                }
              >
                <SelectTrigger className="border-primary/20 focus:border-primary w-[160px]">
                  <SelectValue placeholder="Mức giá" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.id} value={range.id}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <RenderTemplates templates={filteredTemplates} clearFilters={clearFilters} />
    </>
  );
};

export default FilterTemplates;