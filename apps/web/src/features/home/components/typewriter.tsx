import { TECHNOLOGY_LABELS } from "@repo/shared/constants/technologies";
import { ClientOnly } from "@tanstack/react-router";
import { useMemo } from "react";
import Typewriter from "typewriter-effect";

function TypewriterComponent() {
  const typewriterOptions = useMemo(
    () => ({
      strings: [...TECHNOLOGY_LABELS],
      autoStart: true,
      loop: true,
      delay: 80,
      deleteSpeed: 50,
    }),
    [],
  );

  return (
    <ClientOnly fallback={<span>&nbsp;</span>}>
      <Typewriter options={typewriterOptions} />
    </ClientOnly>
  );
}

export { TypewriterComponent };
