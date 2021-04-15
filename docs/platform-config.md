---
title: Platform Configuration
---
import Mermaid from '@theme/Mermaid';

## Data Model

<Mermaid chart={`
  erDiagram
    GROUP ||..|{ ROLE : has
    GROUP {
      string name
    }
    ROLE }|..|{ ENTITLEMENT : has
    ENTITLEMENT }|..|{ MACHINE-DEF : consistsof
`}/>
