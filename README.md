# Complytic

Tamper-evident execution records for AI agents.

Complytic is a pre-revenue, open-source reference implementation being built in public. It produces signed, hash-linked intent and outcome receipts around database writes and includes a local verifier, tamper tests, a threat model, and a committed test chain.

This is not a deployed product. There are no client engagements, deployments, or case studies, and the implementation has not been independently audited.

## Verify it yourself

```sh
git clone https://github.com/ALY219/complytic-receipts
cd complytic-receipts && pip install -r requirements.txt
make demo && make verify
make tamper
```

The website in this repository is built with React, Vite, TypeScript, and Tailwind CSS.

## Development

```sh
pnpm install
pnpm build
pnpm format
```

Code is released under MIT. No certification, attestation, or legal determination is claimed or implied.
