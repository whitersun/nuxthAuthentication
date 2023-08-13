export default defineAppConfig({
    ui: {
        container: {
            constrained: 'max-w-5xl'
        },
        button: {
            font : {
                "normal": "font-normal",
                "medium": "font-medium",
                "bold": "font-bold",
            },

            size: {
                "2xs": "text-xs",
                "xs": "text-xs",
                "sm": "text-sm",
                "md": "text-sm",
                "lg": "text-sm",
                "xl": "text-base",
                "2xl": "text-2xl",
                "3xl": "text-3xl",
            },

            gap: {
                "2xs": "gap-x-1",
                "xs": "gap-x-1.5",
                "sm": "gap-x-1.5",
                "md": "gap-x-2",
                "lg": "gap-x-2.5",
                "xl": "gap-x-2.5",
                "2xl": "gap-x-3",
            },

            padding: {
                "2xs": "px-2 py-1",
                "xs": "px-2.5 py-1.5",
                "sm": "px-2.5 py-1.5",
                "md": "px-3 py-2",
                "lg": "px-3.5 py-2.5",
                "xl": "px-3.5 py-2.5",
                "2xl": "px-4 py-3",
            },

            default: {
                loadingIcon: "i-mingcute-loading-fill"
            }
        }
    }
})