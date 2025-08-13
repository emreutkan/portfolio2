// Example: How to toggle project highlighting
// This demonstrates how you can change which projects appear in the "Big Projects" section

import { projects } from './projects';

// Function to set a project as highlighted
export const setProjectHighlighted = (projectId: number, highlighted: boolean): void => {
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.highlighted = highlighted;
    console.log(`Project "${project.title}" is now ${highlighted ? 'highlighted' : 'not highlighted'}`);
  }
};

// Function to get current highlighted projects
export const getCurrentHighlightedProjects = () => {
  return projects.filter(p => p.highlighted);
};

// Example usage:
// To move "E-Commerce Platform" (id: 4) to Big Projects section:
// setProjectHighlighted(4, true);

// To remove "Healthcare Management System" (id: 3) from Big Projects:
// setProjectHighlighted(3, false);

// Current highlighted projects (will appear in Big Projects section):
// - Enterprise ERP System (id: 1)
// - Smart City Management Platform (id: 2) 
// - Healthcare Management System (id: 3)

// All other projects (highlighted: false) will appear in Featured Projects carousel

export default {
  setProjectHighlighted,
  getCurrentHighlightedProjects
};
