declare module "next-pwa" {
    import type { NextConfig } from "next"

    function withPWA(config: {
        dest: string
        disable?: boolean
    }): (nextConfig: NextConfig) => NextConfig

    export default withPWA
}
