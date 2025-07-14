"use client"; // Client component
import react, { useState } from "react";
import Image from "next/image";
// width={200}
// height={200}

export function PokemonImage({ image, name }: { image: string, name: string }) {

    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <Image
            src={image}
            alt={"Picture of " + name}
            priority
            fill
            objectFit="contain"
            className={`transition-opacity duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            placeholder="blur"
            //blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAACw0lEQVR4nG2US2sUQRSFv1v9mkTjixCIIAYSJBsFF+JPEBUl6M5/4A9w7UpBcCGIq6zcBUFEEUHjypWCxIiRJAafEJwE8553z/R1UVU9PaMFQ/fcqr73nHNPXak3aiqACijdJQqIffq4YN8VEHdeAFVsVARDXzLVQgbtfiQUsrq9/iUKIYVkUoBii7qACMW/hm4hv+1xhKjbKO56pIB4fJ6b/gtA3TkVWyxPlqE9iSQKIYlQH08SG/OsPROx7wKE2qeJQazwcYRZWMY8nSX4vARAZ3KC+pXzxCcn0WYTUcfANUURpNasqUdlHMEsjpDnr4kaHczeLnL7PiQRpCm/UqFz6waj1y6hzZZVSLsOMFY2sRQBjUJkcYVoegYpr8HsG4hjCEPYP8gh2qxcv0ll4QsmCnNmXleTt9whV2MoPXlJsPQV8+Ah8nGRZ9rhRdqCTNmXxLC7wdr0IzCB1bHwC3vNKkia8mpunq3qHiaOWBbl2N2brK1t8OHOPUaqLRaoM/5+jvF26jT09oK8Zd68minfp86xevY0QRDwu1xmeKdC+fc6e1cv8jOIWV1dJ5kchyzDt8PbTWrNWu55o3azlAxSXDOPnyHA1OULvPv0jd1Kg7GjRzhxfBjNtEdDm1C9Nb3JhTCMCUwuMY1Wm7fzy2ztVImjiDOnxjgwVOrq1UNZxBpXxLlf2djZZXO7BsBepcH61g7tdodSEjM5PsrBoQE0U2duzV0Seg9Cd8K02h3SNOXP5jYrP8pkCkaE0AgTx0coxQHNNCUKgrwf/raF9mZoD/JOJ6NebzGYRIyNHqZSraMq7BsskUQh1VqDgVJsPVIAlKki9UZNc5tL16Qi7j73TA7XALXDQ10TxUkmiNNQrSnzpeSHTdcYOTMtPPNyzjamB4A/kCPVvND/pjpiL0MxGBa1KwB0I9BNHimQ7iveH/sLZ01Yd61qbP8AAAAASUVORK5CYII="
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAACgUlEQVR4nF1Uy2oUURSsun27e5IYX4RABElggmSj4EL8BFFRgu78Az/AdVYKggtBXGXlLggiBhE0rlwpSIwYSWLwCSGTYB6Tmel59EyXi9uPiU0v+p7uc6rq3qpmsxURECGkFwUQVFohIEAACbmlAAikQV+nlHUo/Y7IBgDF+AzDIutkBiSkw0HmjwbpOFd2KBYC0Vd2+AAdsGOpQwCpLMLkrBIob6NvEfpylTCkbx3VVCAhgoBVnx4DClDgm+U182LB+7oKoDc12bxxOTg7pXabAgthZNSOHKABCSSBz5dv/VbP1A547xFCH3H8 &#8203;``【oaicite:0】``&#8203;"
        />
    )
}
