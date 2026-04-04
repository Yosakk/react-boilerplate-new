
import { Input } from '@/components/ui/input/input'
import Textarea from '@/components/ui/input/textarea'

export const exampleRouteNames = "/example"

const Example = () => {
    return (
        <div>
            <div className="grid grid-cols-2 m-6 gap-5">
                <div className='border p-5 space-y-5'>
                    <h1 className='text-3xl'>Example Input</h1>
                    <Input required name='name' label='Name' placeholder='Input your Name' />
                    <Textarea label="Catatan" placeholder="Tulis di sini…" />
                    <Textarea label="Deskripsi" required rows={6} />
                </div>
                <div className='border'>
                    <h1 className='text-3xl'>Example Input</h1>
                    <Input>
                    </Input>
                </div>
            </div>

        </div>
    )
}

export default Example