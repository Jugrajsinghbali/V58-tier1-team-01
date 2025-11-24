export const mockChinguData = [
  {
    id: '1',
    timestamp: '2023-10-15T14:30:00Z',
    gender: 'Female',
    country: 'United States',
    roleType: 'Developer',
    role: 'Frontend',
    soloProjectTier: 'Tier 2',
    voyageTier: 'Tier 3',
    voyage: 'Voyage 46'
  },
  {
    id: '12',
    timestamp: '2023-06-30T11:00:00Z',
    gender: 'Female',
    country: 'France',
    roleType: 'Developer',
    role: 'Backend',
    soloProjectTier: 'Tier 3',
    voyageTier: 'Tier 3',
    voyage: 'Voyage 44'
  }
];

export const getUniqueValues = (key) => {
  const values = mockChinguData.map(item => item[key] || '');
  return Array.from(new Set(values.filter(Boolean))).sort();
};

export const getYears = () => {
  const years = mockChinguData.map(item => new Date(item.timestamp).getFullYear().toString());
  return Array.from(new Set(years)).sort().reverse();
};
