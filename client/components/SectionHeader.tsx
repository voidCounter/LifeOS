interface SectionHeaderProps {
    title: string
    description: string | null
}

export default function SectionHeader({
                                          title,
                                          description
                                      }: SectionHeaderProps) {
    return (
        <h1 className="font-semibold text-xl">{title}</h1>
    );

}