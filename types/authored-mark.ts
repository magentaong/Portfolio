type AuthoredMarkBase = {
  id: string;
  src: string;
  width: number;
  height: number;
  caption?: string;
};

export type AuthoredMark = AuthoredMarkBase &
  (
    | {
        decorative: true;
        alt: "";
        transcription?: never;
      }
    | {
        decorative?: false;
        alt: string;
        transcription?: string;
      }
  );
