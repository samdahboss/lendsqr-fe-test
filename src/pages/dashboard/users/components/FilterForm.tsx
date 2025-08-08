import React, { useState, useRef, useEffect } from "react";
import { UserFilters } from "../../../../hooks/useUsers";

interface FilterFormProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  filters,
  onFiltersChange,
  onClose,
  isOpen,
}) => {
  const [localFilters, setLocalFilters] = useState<UserFilters>(filters);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  const handleInputChange = (field: keyof UserFilters, value: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilter = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: UserFilters = {};
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`filter-overlay ${isOpen ? "open" : ""}`}>
      <div className='filter-form' ref={formRef}>
        <div className='filter-form__header'>
          <svg viewBox='0 0 20 20' fill='currentColor'>
            <path
              fillRule='evenodd'
              d='M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z'
              clipRule='evenodd'
            />
          </svg>
          <h3>Filter Users</h3>
        </div>

        <div className='filter-form__field'>
          <label>Organization</label>
          <select
            value={localFilters.organization || ""}
            onChange={(e) => handleInputChange("organization", e.target.value)}
          >
            <option value=''>Select</option>
            <option value='Lendsqr'>Lendsqr</option>
            <option value='Irorun'>Irorun</option>
            <option value='Lendstar'>Lendstar</option>
          </select>
        </div>

        <div className='filter-form__field'>
          <label>Username</label>
          <input
            type='text'
            placeholder='User'
            value={localFilters.username || ""}
            onChange={(e) => handleInputChange("username", e.target.value)}
          />
        </div>

        <div className='filter-form__field'>
          <label>Email</label>
          <input
            type='email'
            placeholder='Email'
            value={localFilters.email || ""}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>

        <div className='filter-form__field'>
          <label>Date</label>
          <input
            type='date'
            value={localFilters.date || ""}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
        </div>

        <div className='filter-form__field'>
          <label>Phone Number</label>
          <input
            type='tel'
            placeholder='Phone Number'
            value={localFilters.phone || ""}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>

        <div className='filter-form__field'>
          <label>Status</label>
          <select
            value={localFilters.status || ""}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <option value=''>Select</option>
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
            <option value='Pending'>Pending</option>
            <option value='Blacklisted'>Blacklisted</option>
          </select>
        </div>

        <div className='filter-form__actions'>
          <button type='button' className='reset' onClick={handleReset}>
            Reset
          </button>
          <button type='button' className='filter' onClick={handleFilter}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};
