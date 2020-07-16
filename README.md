# GetTix

This repository is my way of learning microservices and cloud development. Nothing more, nothing less.

## Installation

GetTix uses a number of open source projects to work properly:

- [Docker] - A robot that automatically deploys applications,aka Containers.
- [Kubernetes]- Container orchestration.
- [skaffold] - Command line tool that facilitates continuous development for Kubernetes applications.
- [ingress-nginx]- Ingress controller for Kubernetes
- [Node.js] - JavaScript runtime.
- [Express] - Fast node.js network app framework.
- [Stripe] - Online payment processing for internet businesses.

### Clone

- Clone this repo to your local machine using https://github.com/ShaiDemri/ticketing.git

### Configuration

- Create an account in [Stripe] and then copy your public and private keys from [here](https://dashboard.stripe.com/test/apikeys)

- On your local machine define the following k8s secrets:

```sh
     $ kubectl create secret generic stripe-secret --from-literal=STRIPE_KEY="your-PRIVATE-STRIPE-secret"

     $ kubectl create secret generic stripe-public-key --from-literal=STRIPE_PUBLIC_KEY="your-PUBLIC-STRIPE-secret"

     $ kubectl create secret generic jwt-secret --from-literal=JWT_KEY="your-JWT-secret"
```

- Also, you'll need to configure ingress-nginx on your machine. Please follow along this [instructions]


- Add `127.0.0.1 ticketing.dev` to  your ~/etc/hosts file.
---

[docker]: https://www.docker.com/products/docker-desktop
[kubernetes]: https://kubernetes.io/
[skaffold]: https://skaffold.dev/
[ingress-nginx]: https://kubernetes.github.io/ingress-nginx/deploy/
[node.js]: https://nodejs.org/en/
[express]: https://expressjs.com/
[stripe]: https://dashboard.stripe.com/register
[instructions]: https://kubernetes.github.io/ingress-nginx/deploy/#provider-specific-steps
