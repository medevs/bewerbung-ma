# Job Search and Ausbildung Finder Components

## Overview

This directory contains components for the job search and apprenticeship (Ausbildung) finder features. These components allow users to search for jobs and apprenticeships in Germany, filter results, and generate application letters.

## Components

### JobSearch

The main component for searching regular job positions. It includes:

- Filtering by location, job type, field, and other criteria
- Support for visa sponsorship filtering
- Integration with letter generation

### AusbildungFinder

Specialized component for finding apprenticeship positions (Ausbildung) in Germany. Features:

- Filtering by field, location, and other apprenticeship-specific criteria
- Support for accommodation and visa sponsorship filtering
- Integration with letter generation

### JobFilter

Reusable filter component used by JobSearch. Provides:

- Search input
- Location filtering
- Job type and field filtering
- Experience level filtering
- Visa sponsorship and remote work options

### JobListingCard

Reusable card component for displaying job listings. Shows:

- Job title, company, and location
- Job description
- Requirements and benefits
- Visa sponsorship and other tags
- Buttons for generating application letters and viewing details

## Usage

```jsx
// Using JobSearch
<JobSearch />

// Using AusbildungFinder
<AusbildungFinder />

// Using JobListingCard directly
<JobListingCard 
  job={jobData} 
  onGenerateLetter={handleGenerateLetter} 
/>
```

## Integration with Letter Generation

Both the JobSearch and AusbildungFinder components integrate with the letter generation feature. When a user clicks the "Generate Letter" button on a job listing, they are redirected to the letter generation page with the job title and company pre-filled.

## Data Structure

Job listings follow this structure:

```typescript
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements?: string[];
  benefits?: string[];
  startDate?: string;
  duration?: string;
  url: string;
  visaSponsorship?: boolean;
  accommodation?: boolean; // For apprenticeships
  tags?: string[];
  applied?: boolean;
  created_at?: string;
}
```
