export type ArchivePageConfig = {
  pathname: string;
  backLink: {
    label: string;
    href: string;
  };
  eyebrow: string;
  titleLines: string[];
  introduction: string;
  metadata: {
    title: string;
    description: string;
  };
};
