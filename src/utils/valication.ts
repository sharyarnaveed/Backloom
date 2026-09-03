export function validationprojectname(name:string){
     const trimmedName = name.trim();

  if (!trimmedName) {
    return "Project name cannot be empty.";
  }

  if (trimmedName.length > 214) {
    return "Project name cannot be longer than 214 characters.";
  }

  if (!/^[a-z0-9-]+$/.test(trimmedName)) {
    return "Project name can only contain lowercase letters, numbers, and hyphens.";
  }

  if (trimmedName.startsWith("-") || trimmedName.endsWith("-")) {
    return "Project name cannot start or end with a hyphen.";
  }

  return true;
}